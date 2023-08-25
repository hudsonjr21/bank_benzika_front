import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import PlayerCard from '../../components/PlayerCard';
import { setupAPIClient } from '@/src/services/api';
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { Header } from '@/src/components/Header';

type Player = {
  id: string;
  name: string;
  position_id: string;
  profile: string;
  profileImage: string;
};

type Position = {
  id: string;
  name: string;
};

export default function SquadPage () {
  const [players, setPlayers] = useState<Player[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const apiClient = setupAPIClient();
        const [playersResponse, positionsResponse] = await Promise.all([
          apiClient.get('/player'),
          apiClient.get('/position'),
        ]);

        setPlayers(playersResponse.data);
        setPositions(positionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPlayers();
  }, []);

  const getPositionName = (positionId: string) => {
    const position = positions.find((pos) => pos.id === positionId);
    return position ? position.name : 'Posição desconhecida';
  };

  return (
    <>
      <Head>
        <title>Elenco - JOGOS ENTRE AMIGOS</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Elenco</h1>

          <div className={styles.playerList}>
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                name={player.name}
                positionId={getPositionName(player.position_id)}
                profileImage={player.profileImage}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
