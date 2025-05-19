"use client";

import { useState, useEffect } from 'react';

const fetchHello = async () => {
  try {
    const response = await fetch('http://localhost:8001/hello');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from API:', error);
  }
};

export function ExampleHello() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchHello().then(result => setData(result));
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}