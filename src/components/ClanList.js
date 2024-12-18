import React, { useEffect, useState } from 'react';
import { fetchClanTags } from '../api';

const ClanList = () => {
        const [clans, setClans] = useState([]);
        const [error, setError] = useState('');

        useEffect(() => {
                const fetchData = async () => {
                        try {
                                const data = await fetchClanTags();
                                setClans(data); // Update the state with the fetched clan tags
                        } catch (err) {
                                setError(err.message);
                        }
                };

                fetchData();
        }, []);

        return (
                <div>
                        <h2>Clans List</h2>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {clans.length > 0 ? (
                                <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                                        <thead>
                                                <tr>
                                                        <th style={{ padding: '8px', textAlign: 'left' }}>Sr. No.</th>
                                                        <th style={{ padding: '8px', textAlign: 'left' }}>Clan Tag</th>
                                                        <th style={{ padding: '8px', textAlign: 'left' }}>League</th>
                                                        <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                                {clans.map((clan, index) => (
                                                        <tr key={clan._id}>
                                                                <td style={{ padding: '8px' }}>{index + 1}</td> {/* Add Sr. No. */}
                                                                <td style={{ padding: '8px' }}>{clan.clanTag}</td>
                                                                <td style={{ padding: '8px' }}>{clan.League}</td>
                                                                <td style={{ padding: '8px' }}>{clan.Status}</td>
                                                        </tr>
                                                ))}
                                        </tbody>
                                </table>
                        ) : (
                                <p>No clans found.</p>
                        )}
                </div>
        );
};

export default ClanList;
