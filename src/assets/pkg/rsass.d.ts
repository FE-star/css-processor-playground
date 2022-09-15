/* tslint:disable */
/* eslint-disable */
/**
* Parse a scss value from a buffer and write its css representation
* in the given format.
*
* # Example
*
* ```
* # use rsass::{compile_value, Error};
* # fn main() -> Result<(), Error> {
* assert_eq!(compile_value(b"10px + 4px", Default::default())?, b"14px");
* assert_eq!(compile_value(b"10px 4px", Default::default())?, b"10px 4px");
* # Ok(())
* # }
* ```
* @param {string} name
*/
export function jscompile_scss(name: string): void;
