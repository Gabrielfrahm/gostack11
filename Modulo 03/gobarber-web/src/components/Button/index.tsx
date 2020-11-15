import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

// uma interface que e derivada de outra interface
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
};

export default Button;
