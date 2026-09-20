function ComplaintTable({ complaints }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Issue</th>
                    <th>Authority</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {complaints.map((c) => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.issue}</td>
                        <td>{c.authority}</td>
                        <td>{c.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ComplaintTable;