import React, { Component } from 'react'
import './App.css'
import Todo from './componetn/todoapp/todo'
import Header from './componetn/header/Header'

export default class App extends Component {
  render() {
    return (
      <div className="app-body">
      <Header />
      <main className="main-content">
        <Todo />
      </main>
    </div>
    )
  }
}

