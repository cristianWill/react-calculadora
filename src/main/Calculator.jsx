import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      // Definindo Operação, limpando display, escrevendo segundo numero.
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      // Utilizado para identificar que foi pressionado "="
      const equals = operation === "=";

      // Obtendo qual é a operação que foi pressionada.
      const currentOperation = this.state.operation;

      // Clonando array values.
      const values = [...this.state.values];

      switch (currentOperation) {
        case "+":
          values[0] = values[0] + values[1];
          break;

        case "-":
          values[0] = values[0] - values[1];
          break;

        case "*":
          values[0] = values[0] * values[1];
          break;

        case "/":
          values[0] = values[0] / values[1];
          break;
      }
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    // Verificando se já foi digitado "."
    if (n == "." && this.state.displayValue.includes(".")) return;

    // Identificando quando irá limpar a calculadora
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    // Identificando se é para limpar o display para não concatenar zero.
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;

    // JavaScript entende o nome da variavel como atributo do objeto
    this.setState({ displayValue, clearDisplay: false });

    // Avaliando se é numero
    if (Number.isInteger(parseInt(n))) {
      // Identificando se estou utilizando o valor antes ou depois da operação
      const i = this.state.current;

      // Utilizando Spread para clonar os dados do Array Existente
      const values = [...this.state.values];

      // Alterando valor atual da operação
      values[i] = parseFloat(displayValue);

      // JS já identifica pelo nome da variavel que o atributo "values" precisa ser alterado
      this.setState({ values });
    }
  }

  render() {
    const addDigit = (n) => this.addDigit(n);
    const setOperation = (op) => this.setOperation(op);

    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" span={3} color="" click={() => this.clearMemory()} />
        <Button label="/" operation click={setOperation} />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button label="*" click={setOperation} operation />
        <Button label="4" click={addDigit} />
        <Button label="5" click={addDigit} />
        <Button label="6" click={addDigit} />
        <Button label="-" click={setOperation} operation />
        <Button label="1" click={addDigit} />
        <Button label="2" click={addDigit} />
        <Button label="3" click={addDigit} />
        <Button label="+" click={setOperation} operation />
        <Button label="0" click={addDigit} span="2" />
        <Button label="." click={addDigit} />
        <Button label="=" click={setOperation} operation />
      </div>
    );
  }
}
