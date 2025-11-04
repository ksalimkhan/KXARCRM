'use client';

import client from '../../lib/db'

// This might be a helpful refereence for adding entries into db based on input
// https://krython.com/tutorial/typescript/postgresql-with-typescript-sql-database
export default function AddEntry(){
    const addEntry = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        async function processData(first_name: string, last_name: string, email_address: string, phone_number: string, address: string, notes: string){
            try{
                const query = 'INSERT INTO customers(first_name, last_name, email_address, phone_number, address, last_contacted, notes, status) VALUES( $1, $2, $3, $4, $5, null, $6, NULL)';
                const values = [first_name, last_name, email_address, phone_number, address, notes];
                await client.query(query, values);
            } catch(error){
                console.error('Error processing data: ', error);
                throw error;
            }
        }
    }

    return(
        <>
        <input type="text" id="new_first_name" name="new_first_name" placeholder="First Name"></input>
        <input type="text" id="last_name" name="new_last_name" placeholder="Last Name"></input>
        <input type="text" id="email_address" name="new_email_address" placeholder="Email Address"></input>
        <input type="text" id="phone_number" name="new_phone_number" placeholder="Phone Number"></input>
        <input type="text" id="address" name="new_address" placeholder="Address"></input>
        <input type="text" id="notes" name="new_notes" placeholder="Notes"></input>
        
        <button onClick={addEntry}
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        >
            Add Entry
        </button>

        </>
    )
}