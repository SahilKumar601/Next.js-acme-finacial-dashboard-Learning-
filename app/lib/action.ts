'use server';
import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const formSchema = z.object({
    id:z.string(),
    customerId:z.string(),
    amount:z.coerce.number(),
    status:z.enum(['pending','done']),
    date:z.string(),
});
const CreateInvoice=formSchema.omit({id:true,data:true});
export async function createForm(formData: FormData){
    const {customerId,amount,status}=CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });
    const amountsinCents = amount*100;
    const date = new Date().toISOString().split('T')[0];
    await sql` INSERT INTO invoices (customerId,amount,status,date) VALUES (${customerId},${amount},${status},${date})`;
    revalidatePath('/dashboard/invoices');
}