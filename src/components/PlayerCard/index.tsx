import React from 'react';
import styles from './style.module.scss';

type PlayerCardProps = {
  profileImage: string; // Adicione a prop profileImage
  name: string;
  positionId: string;
};

export default function PlayerCard({ profileImage, name, positionId } : PlayerCardProps) {
  return (
    <div className={styles.card}>
      <img src={profileImage} alt={`Foto de ${name}`} className={styles.image} />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.position}>{positionId}</p>
    </div>
  );
};
