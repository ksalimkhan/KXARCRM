import "./tableStyle.css";

export function ShowPayments () {
    return (
        <div>
            <h2>Projects</h2>
            <table>
                <thead>
                <tr>
                    <th>first_name</th>
                    <th>last_name</th>
                    <th>project</th>
                    <th>amount</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Bob</td>
                    <td>Simon</td>
                    <td>Logo</td>
                    <td>$100</td>
                </tr>
                <tr>
                    <td>John</td>
                    <td>Vargas</td>
                    <td>Poster</td>
                    <td>$200</td>
                </tr>
                <tr>
                    <td>Simon</td>
                    <td>Petrikov</td>
                    <td>Snow Castle</td>
                    <td>$1,000,000</td>
                </tr>
            </tbody>
            </table>
        </div>
    );
}


