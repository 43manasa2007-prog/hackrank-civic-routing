function AuthorityTable({ authorities }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Authority</th>
                    <th>Complaints</th>
                </tr>
            </thead>

            <tbody>
                {authorities.map((a, index) => (
                    <tr key={index}>
                        <td>{a.name}</td>
                        <td>{a.complaints}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AuthorityTable;