import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    backgroundColor: string;
    borderColor: string;
    buttonColor: string;
    buttonTextColor: string;
  }
}
