import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  /**
   * This function rounds the inputNumber up to the nearest multiple of 1000.
   * For example: 550 ==> 1000 or 32455 ==> 33000
   * How it works:
   *  (1) inputNumber / 1000 ==> results in how many 1000 are in inputNumber
   *  (2) Math.ceil() ==> Takes the result of above and ronds it up to nearest integer
   *      For example 550 / 1000 = 0.55 Math.ceil(0.55) = 1
   *      Another example 32455 / 1000 = 32.455 Math.ceil(32.455) = 33
   *  (3) Finaly aftre MAth.ceil() returned an integer we multiply by 1000 to get the result
   * @param inputNumber
   * @returns
   */
  roundUpToNearestThousand(inputNumber: number): number {
    return Math.ceil(inputNumber / 1000) * 1000;
  }

  /**
   * This function receives an array of array-entities. Each entity is an array
   * of a string and a number.
   * It returns a new array  where all the strings are converted to uppercase.
   * @param myArray
   * @returns
   */
  convertArrayToUpperCase(myArray: [string, number][]): [string, number][] {
    console.log('myArray', myArray);

    const result: any[] = myArray.map(([item, quantity]) => {
      return [item.toUpperCase(), quantity];
    });
    console.log('result', result);
    return result;
  }

  // convertArrayToUpperCase(
  //   array: { name: string; quantity: number }[]
  // ): { name: string; quantity: number }[] {
  //   return array.map((item) => ({
  //     name: item.name.toUpperCase(), // Call toUpperCase() to get the string
  //     quantity: item.quantity,
  //   }));
  // }
}
