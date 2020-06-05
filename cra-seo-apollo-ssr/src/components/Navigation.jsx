import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => (
  <ul>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/product/p-k6wkv09atyshkbn">Product</NavLink>
    </li>
  </ul>
)