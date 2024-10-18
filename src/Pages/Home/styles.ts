import { DatePicker, Table } from 'antd';
import styled from 'styled-components';

// Estilos personalizados
export const Header = styled.header`
  background-color: orange;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .controls {
      margin: 0 1rem;
      display: flex;

      p {
        margin-right: 1.5rem;
        color: white;
      }
  }
`;

export const Title = styled.h1`
  color: white;
  font-size: 24px;
  margin: 0 1rem;
`;

export const StyledTable = styled(Table)`
  border: 2px solid orange;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem;

  .ant-table-thead > tr > th {
    background-color: #fafafa;
  }
  .ant-table-tbody > tr > td {
    background-color: white;
  }

  /* Adiciona a classe para as linhas vermelhas */
  .red-row > td {
    background-color: #ffcccc !important; /* Fundo vermelho suave para as células da linha */
  }
`;


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Expandir o conteúdo */
  padding: 20px;
  background-color: #fff;
  min-height: 100%; /* Garantir que ocupe a altura disponível */
  margin: 1rem 5rem;

`;

export const StyledCard = styled.div`
  border: 2px solid orange;  /* Contorno laranja */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Sombra */
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  width: 100%;
  margin: 0 1rem;
`;

export const StyledCardRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Legend = styled.h3`
  margin: 1rem 0 0 1rem;
  font-size: .9rem;
  color: rgba(0, 0, 0, 0.45);
`;


export const StyledDatePicker = styled(DatePicker)`
  .ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-selected:not(.ant-picker-cell-disabled) .ant-picker-cell-inner,
  .ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-range-start:not(.ant-picker-cell-disabled) .ant-picker-cell-inner,
  .ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-range-end:not(.ant-picker-cell-disabled) .ant-picker-cell-inner {
    background-color: orange !important; /* Sobrescreve o fundo azul padrão */
    color: white !important; /* Cor do texto */
  }

  .ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before {
    border-color: orange !important; /* Borda laranja para o dia atual */
  }
`;

export const Footer = styled.footer`
    background-color: black;
    padding: .5rem;
    
    p {
        color: white;
        font-size: .8rem;
        text-align: center;
    }
`;
