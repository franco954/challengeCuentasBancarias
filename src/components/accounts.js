import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './accounts.css';

const AccountsRequest = () => {
  const [data, setData] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.npoint.io/97d89162575a9d816661');
        const filteredData = response.data.cuentas.filter(
          item => item.moneda === '$' || item.moneda === 'u$s' || item.tipo_letras === 'CC' || item.tipo_letras === 'CA'
        );
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickMore = () => {
    setStartIndex(prevIndex => prevIndex + 5);
  };

  const handleClickBack = () => {
    setStartIndex(prevIndex => prevIndex - 5);
  };

  const renderAccounts = () => {
    if (!data) {
      return <p>Loading data...</p>;
    }

    const accountsToRender = showAll ? data.slice(startIndex) : data.slice(startIndex, startIndex + 5);

    return (
      <>
        <h1>Consulta de saldo</h1>
        <h2>Selecciona la cuenta a consultar:</h2>
        <div className="account-list">
          {accountsToRender.map(item => (
            <button key={item.n} className="account-item btn">
              {item.tipo_letras === 'CC' ? <p className="account-type">Cuenta corriente</p> : <p className="account-type">Caja de ahorro</p>}
              <p className="account-number">Nro {item.n}</p>
            </button>
          ))}
          {!showAll && data.length > startIndex + 5 && (
            <button className="account-item btn" onClick={handleClickMore}>
              <p>Ver más opciones</p>
            </button>
          )}
          {showAll && startIndex > 0 && (
            <button className="account-item btn" onClick={handleClickBack}>
              <p>Volver atrás</p>
            </button>
          )}
          {showAll && (
            <button className="account-item btn" onClick={() => setShowAll(false)}>
              <p>Visualizar cuentas anteriores</p>
            </button>
          )}
        </div>
      </>
    );
  };

  return <div className="homepage-container">{renderAccounts()}</div>;
};

export default AccountsRequest;
