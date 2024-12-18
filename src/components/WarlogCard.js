import React from "react";

const WarlogCard = ({ war }) => (
  <div className="war">
    <h3>Result: {war.result || "Unknown"}</h3>
    <p>End Time: {new Date(war.endTime).toLocaleString()}</p>
    <p>Opponent Name: {war.opponent.name}</p>
    <p>Opponent Tag: {war.opponent.tag}</p>
    <p>Team Size: {war.teamSize}</p>
    <p>Clan Stars: {war.clan.stars}</p>
    <p>Opponent Stars: {war.opponent.stars}</p>
    <p>Clan Destruction: {war.clan.destructionPercentage}%</p>
    <p>Opponent Destruction: {war.opponent.destructionPercentage}%</p>
  </div>
);

export default WarlogCard;
