import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    display: block;
    transition: 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 30px;
  color: ${(props) => props.theme.accentColor};
`;

// API 데이터를 가져오기전 목업데이터로 스타일링
// const coins = [
//   {
//     id: 'btc-bitcoin',
//     name: 'Bitcoin',
//     symbol: 'BTC',
//     rank: 1,
//     is_new: false,
//     is_active: true,
//     type: 'coin',
//   },
//   {
//     id: 'eth-ethereum',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     rank: 2,
//     is_new: false,
//     is_active: true,
//     type: 'coin',
//   },
//   {
//     id: 'hex-hex',
//     name: 'HEX',
//     symbol: 'HEX',
//     rank: 3,
//     is_new: false,
//     is_active: true,
//     type: 'token',
//   },
// ];

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width : 25px;
  height : 25px;
  margin-right : 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
};



const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const response = await (await fetch("/coins.json")).json()
      setCoins(response.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header >
        <Title>Coin</Title>
      </Header>
      {loading ? (<Loader>Loading...</Loader>) : (
      <CoinList>
      {coins.map((coin) => (
        <Coin key={coin.id}>
          <Link to={`/${coin.id}`} state={`${coin.name}`}>
            <Img 
            src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
            />
            {coin.name} &rarr;
          </Link>
        </Coin>
      ))}
    </CoinList>
      )}
    </Container>
  );
};

export default Coins;