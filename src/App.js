import React , { useState } from "react";
import Wrapper from "./Components/Wrapper";
import Screen from "./Components/Screen";
import ButtonBox from "./Components/ButtonBox";
import Button from "./Components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];


    const toLocaleString = (num) =>
      String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

    const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

    // numClickHandler function

    const commaClickHandler = (e) => {
      e.preventDefault();
      const value = e.target.innerHTML;

      setCalc({
        ...calc,
        num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
      });
    };

    // commaClickHandler function

    const signClickHandler = (e) => {
      e.preventDefault();
      const value = e.target.innerHTML;

      setCalc({
        ...calc,
        sign: value,
        res: !calc.res && calc.num ? calc.num : calc.res,
        num: 0,
      });
    };

    // signClickHandler function

      const equalsClickHandler = () => {
        if (calc.sign && calc.num) {
          const math = (a, b, sign) =>
            sign === "+"
              ? a + b
              : sign === "-"
              ? a - b
              : sign === "X"
              ? a * b
              : a / b;

          setCalc({
            ...calc,
            res:
              calc.num === "0" && calc.sign === "/"
                ? "Can't divide with 0"
                : math(Number(calc.res), Number(calc.num), calc.sign),
            sign: "",
            num: 0,
          });
        }
      };

      // equalsClickHandler function

      const invertClickHandler = () => {
        setCalc({
          ...calc,
          num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
          res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
          sign: "",
        });
      };

    // invertClickHandler function

    const percentClickHandler = () => {
      let num = calc.num ? parseFloat(calc.num) : 0;
      let res = calc.res ? parseFloat(calc.res) : 0;

      setCalc({
        ...calc,
        num: (num /= Math.pow(100, 1)),
        res: (res /= Math.pow(100, 1)),
        sign: "",
      });
    };

    // percentClickHandler function

    const resetClickHandler = () => {
      setCalc({
        ...calc,
        sign: "",
        num: 0,
        res: 0,
      });
    };



  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                } 
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
