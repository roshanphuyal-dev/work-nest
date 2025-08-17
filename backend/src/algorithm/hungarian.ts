const MAX_SIZE =
  parseInt((Number.MAX_SAFE_INTEGER / 2) as unknown as string) ||
  (1 << 26) * (1 << 26);
const DEFAULT_PAD_VALUE = 0;

export class Hungarian {
  C: number[][] | null = null;
  row_covered: boolean[] = [];
  col_covered: boolean[] = [];
  n = 0;
  Z0_r = 0;
  Z0_c = 0;
  marked: number[][] | null = null;
  path: number[][] | null = null;

  pad_matrix(matrix: number[][], pad_value = DEFAULT_PAD_VALUE) {
    let max_columns = 0;
    let total_rows = matrix.length;

    for (let i = 0; i < total_rows; i++)
      if (matrix[i].length > max_columns) max_columns = matrix[i].length;

    total_rows = Math.max(total_rows, max_columns);
    const new_matrix: number[][] = [];

    for (let i = 0; i < total_rows; i++) {
      const row = matrix[i] || [];
      const new_row = row.slice();
      while (new_row.length < total_rows) new_row.push(pad_value);
      new_matrix.push(new_row);
    }

    return new_matrix;
  }

  compute(cost_matrix: number[][], options: { padValue?: number } = {}) {
    options.padValue = options.padValue ?? DEFAULT_PAD_VALUE;
    this.C = this.pad_matrix(cost_matrix, options.padValue);
    this.n = this.C.length;
    const original_length = cost_matrix.length;
    const original_width = cost_matrix[0].length;

    this.row_covered = Array(this.n).fill(false);
    this.col_covered = Array(this.n).fill(false);
    this.Z0_r = 0;
    this.Z0_c = 0;
    this.path = this.__make_matrix(this.n * 2, 0);
    this.marked = this.__make_matrix(this.n, 0);

    let step = 1;
    const steps: any = {
      1: this.__step1,
      2: this.__step2,
      3: this.__step3,
      4: this.__step4,
      5: this.__step5,
      6: this.__step6,
    };

    while (true) {
      const func = steps[step];
      if (!func) break;
      step = func.apply(this);
    }

    const results: number[][] = [];
    for (let i = 0; i < original_length; i++)
      for (let j = 0; j < original_width; j++)
        if (this.marked[i][j] === 1) results.push([i, j]);

    return results;
  }

  __make_matrix(n: number, val: number) {
    const matrix: number[][] = [];
    for (let i = 0; i < n; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) matrix[i][j] = val;
    }
    return matrix;
  }

  __step1() {
    for (let i = 0; i < this.n; i++) {
      const minval = Math.min(...this.C![i]);
      for (let j = 0; j < this.n; j++) this.C![i][j] -= minval;
    }
    return 2;
  }

  __step2() {
    for (let i = 0; i < this.n; i++)
      for (let j = 0; j < this.n; j++)
        if (
          this.C![i][j] === 0 &&
          !this.col_covered[j] &&
          !this.row_covered[i]
        ) {
          this.marked![i][j] = 1;
          this.col_covered[j] = true;
          this.row_covered[i] = true;
          break;
        }
    this.__clear_covers();
    return 3;
  }

  __step3() {
    let count = 0;
    for (let i = 0; i < this.n; i++)
      for (let j = 0; j < this.n; j++)
        if (this.marked![i][j] === 1 && !this.col_covered[j]) {
          this.col_covered[j] = true;
          count++;
        }
    return count >= this.n ? 7 : 4;
  }

  __step4() {
    let done = false;
    while (!done) {
      const z = this.__find_a_zero();
      const row = z[0];
      const col = z[1];
      if (row < 0) return 6;
      this.marked![row][col] = 2;
      const star_col = this.__find_star_in_row(row);
      if (star_col >= 0) {
        this.row_covered[row] = true;
        this.col_covered[star_col] = false;
      } else {
        this.Z0_r = row;
        this.Z0_c = col;
        return 5;
      }
    }
  }

  __step5() {
    let count = 0;
    this.path![count][0] = this.Z0_r;
    this.path![count][1] = this.Z0_c;
    let done = false;
    while (!done) {
      const row = this.__find_star_in_col(this.path![count][1]);
      if (row >= 0) {
        count++;
        this.path![count][0] = row;
        this.path![count][1] = this.path![count - 1][1];
      } else {
        done = true;
      }
      if (!done) {
        const col = this.__find_prime_in_row(this.path![count][0]);
        count++;
        this.path![count][0] = this.path![count - 1][0];
        this.path![count][1] = col;
      }
    }
    this.__convert_path(this.path!, count);
    this.__clear_covers();
    this.__erase_primes();
    return 3;
  }

  __step6() {
    const minval = this.__find_smallest();
    for (let i = 0; i < this.n; i++)
      for (let j = 0; j < this.n; j++) {
        if (this.row_covered[i]) this.C![i][j] += minval;
        if (!this.col_covered[j]) this.C![i][j] -= minval;
      }
    return 4;
  }

  __find_smallest() {
    let minval = MAX_SIZE;
    for (let i = 0; i < this.n; i++)
      for (let j = 0; j < this.n; j++)
        if (!this.row_covered[i] && !this.col_covered[j])
          if (minval > this.C![i][j]) minval = this.C![i][j];
    return minval;
  }

  __find_a_zero() {
    for (let i = 0; i < this.n; i++)
      for (let j = 0; j < this.n; j++)
        if (this.C![i][j] === 0 && !this.row_covered[i] && !this.col_covered[j])
          return [i, j];
    return [-1, -1];
  }

  __find_star_in_row(row: number) {
    for (let j = 0; j < this.n; j++) if (this.marked![row][j] === 1) return j;
    return -1;
  }

  __find_star_in_col(col: number) {
    for (let i = 0; i < this.n; i++) if (this.marked![i][col] === 1) return i;
    return -1;
  }

  __find_prime_in_row(row: number) {
    for (let j = 0; j < this.n; j++) if (this.marked![row][j] === 2) return j;
    return -1;
  }

  __convert_path(path: number[][], count: number) {
    for (let i = 0; i <= count; i++)
      path[i][1] = this.marked![path[i][0]][path[i][1]] === 1 ? 0 : 1;
  }

  __clear_covers() {
    this.row_covered.fill(false);
    this.col_covered.fill(false);
  }

  __erase_primes() {
    for (let i = 0; i < this.n; i++)
      for (let j = 0; j < this.n; j++)
        if (this.marked![i][j] === 2) this.marked![i][j] = 0;
  }

  static make_cost_matrix(
    profit_matrix: number[][],
    inversion_function?: (x: number) => number
  ) {
    if (!inversion_function) {
      let maximum = -Infinity;
      for (let i = 0; i < profit_matrix.length; i++)
        for (let j = 0; j < profit_matrix[i].length; j++)
          if (profit_matrix[i][j] > maximum) maximum = profit_matrix[i][j];
      inversion_function = (x) => maximum - x;
    }
    const cost_matrix: number[][] = [];
    for (let i = 0; i < profit_matrix.length; i++) {
      cost_matrix[i] = [];
      for (let j = 0; j < profit_matrix[i].length; j++)
        cost_matrix[i][j] = inversion_function(profit_matrix[i][j]);
    }
    return cost_matrix;
  }
}

export function computeHungarian(
  cost_matrix: number[][],
  options?: { padValue?: number }
) {
  const h = new Hungarian();
  return h.compute(cost_matrix, options);
}
