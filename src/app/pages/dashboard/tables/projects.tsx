import "./tableStyle.css";

export function ShowProjects () {
    return (
        <div>
            <h2>Projects</h2>
            <table>
                <thead>
                <tr>
                    <th>first_name</th>
                    <th>last_name</th>
                    <th>project</th>
                    <th>status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Bob</td>
                    <td>Simon</td>
                    <td>Logo</td>
                    <td>Incomplete</td>
                </tr>
                <tr>
                    <td>John</td>
                    <td>Vargas</td>
                    <td>Poster</td>
                    <td>Done</td>
                </tr>
                <tr>
                    <td>Simon</td>
                    <td>Petrikov</td>
                    <td>Ice Castle</td>
                    <td>Done</td>
                </tr>
                </tbody>
                </table>
        </div>
    );
}


