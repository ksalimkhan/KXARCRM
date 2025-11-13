'use client';

import client from '../../lib/db'

// This might be a helpful refereence for adding entries into db based on input
// https://krython.com/tutorial/typescript/postgresql-with-typescript-sql-database
// https://react.dev/reference/rsc/use-client
export default function AddEntry(){
    const addEntry = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const first_name = (document.getElementById("new_first_name") as HTMLInputElement).value;
        const last_name = (document.getElementById("new_last_name") as HTMLInputElement).value;
        const email_address = (document.getElementById("new_email") as HTMLInputElement).value;
        const phone_number = (document.getElementById("new_phone_number") as HTMLInputElement).value;
        const address = (document.getElementById("new_address") as HTMLInputElement).value;
        const notes = (document.getElementById("new_notes") as HTMLInputElement).value;

        try {
            await processData(first_name, last_name, email_address, phone_number, address, notes);
            console.log('User added successfully');
        }catch (error) {
            console.error('Error adding new user: ', error);
        }

        
        async function processData(first_name: String, last_name: String, email_address: String, phone_number: String, address: String, notes: String){
            const query = 'INSERT INTO customers(first_name, last_name, email_address, phone_number, address, last_contacted, notes, status) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)';
            const params = [first_name, last_name, email_address, phone_number, address, null, notes, null];
            client.query(query, params, (err, results) => {
                if (err) throw err;
                console.log('User added');
            })
        }
    }

    return(
        <>
        {/* Maybe try wrapping these all as a form */}
        <input type="text" id="new_first_name" name="new_first_name" placeholder="First Name"></input>
        <input type="text" id="new_last_name" name="new_last_name" placeholder="Last Name"></input>
        <input type="text" id="new_email_address" name="new_email_address" placeholder="Email Address"></input>
        <input type="text" id="new_phone_number" name="new_phone_number" placeholder="Phone Number"></input>
        <input type="text" id="new_address" name="new_address" placeholder="Address"></input>
        <input type="text" id="new_notes" name="new_notes" placeholder="Notes"></input>
        <button onClick={addEntry}
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        >
            Add Entry
        </button>

        </>
    )
}