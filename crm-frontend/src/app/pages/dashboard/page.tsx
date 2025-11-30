import AddEntry from "./addEntry";
import RemoveEntry from "./removeEntry";
import "./pageStyle.css";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";


async function getCustomerData() {

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  if (!baseURL) { throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not set.");}

  const response = await fetch(`${baseURL}/server`, { cache: 'no-store' });
  if (!response.ok) { throw new Error('Failed to fetch data from internal API.');}

  return response.json();
}


export default async function DashboardPage() {
  // Fetch customer data from the internal API route
  let customers: any[] = [];
  try {
    customers = await getCustomerData();
  } catch (error) {
    console.error(error);
    // You might render an error message here
    return <div>Error loading data. Check console.</div>;
  }
  
  // previous way to view the data
  // <pre>{JSON.stringify(customers, null, 2)}</pre>

  return (
    <Card className="m-8 p-8">
      <div>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <div className="gap-4 flex">
            <Button>Customers</Button>
            <Button >Projects</Button>
            <Button>Payments</Button>
            </div>
            </CardHeader>

            <CardContent>
            <div>
            <h2>Customers</h2>
            <table>
            <thead>
            <tr>
            <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Last Contact</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.email_address}</td>
              <td>{customer.phone_number}</td>
              <td>{customer.address}</td>
              <td>{customer.last_contact}</td>
              <td>{customer.notes}</td>
              <td>{customer.status}</td>
              </tr>
            ))}
            </tbody>
            </table>
            </div>
            <div className="modifier">
            <AddEntry />
            </div>
          <div className="modifier">
          <RemoveEntry />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
