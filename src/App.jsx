import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { label, amount: parseFloat(amount), date }]);
    setLabel('');
    setAmount('');
    setDate('');
    handleClose();
  };

  const totalIncome = expenses.filter(exp => exp.amount > 0).reduce((acc, exp) => acc + exp.amount, 0);
  const totalExpenses = expenses.filter(exp => exp.amount < 0).reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div className="contenitore">
      <h1>Gestore Spese</h1>
    <Button variant="primary" onClick={handleShow}>
      Aggiungi
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>Aggiungi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={handleSubmit}>
      <Form.Group>
      <Form.Label>Etichetta</Form.Label>
      <Form.Control
      type="text"
      value={label}
      onChange={(e) => setLabel(e.target.value)}
      required
      />
        </Form.Group>
        <Form.Group>
        <Form.Label>Importo</Form.Label>
        <Form.Control
           type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
        />
        </Form.Group>
        <Form.Group>
        <Form.Label>Data</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        </Form.Group>
        <Button variant="primary" type="submit">
          Aggiungi
        </Button>
        </Form>
        </Modal.Body>
        </Modal>

      <div className="righe">
      <div className="div1">
      <h2>Movimenti</h2>
      <ul className="movimenti">
        {expenses.sort((a, b) => new Date(a.date) - new Date(b.date)).map((expense, index) => (
        <li key={index}>
        <span>{expense.amount > 0 ? '+' : ''}{expense.amount}€ {expense.label}</span>
        <span>{new Date(expense.date).toLocaleDateString()}</span>
          </li>
            ))}
        </ul>
        </div>
        <div className="div1">
        <h2>Imponibile</h2>
        <div className="somma">
          <p>Entrate: {totalIncome}€</p>
          <p>Uscite: {totalExpenses}€</p>
          <p>Saldo: {totalIncome + totalExpenses}€</p>
        </div>
        </div>
        </div>
        </div>
  );
};

export default App;