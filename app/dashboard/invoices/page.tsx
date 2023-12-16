import Pagination from "@/app/ui/invoices/pagination"
import Search from "@/app/ui/search"
import Table from '@/app/ui/invoices/table'
import { CreateInvoice } from "@/app/ui/invoices/buttons"
import { InvoicesTableSkeleton } from "@/app/ui/skeletons"
import { Suspense } from "react"
import { lusitana } from "@/app/ui/fonts"
import { pages } from "next/dist/build/templates/app-page"
import { fetchInvoicesPages } from "@/app/lib/data"

export default  async function Page({
    searchParams,
}:{
    searchParams?:{
        query?:string,
        page?:string,
    };
}){
    const query = searchParams?.query || '';
    const currrentPage =Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query);
    return (
        <div className="w-full">
            <div className="flex w-full justify-between items-center">
                <h2 className={`${lusitana} text-2xl`}>Invoices</h2>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Seaching Invoices...." />
                <CreateInvoice/>
            </div>
            <Suspense key={query+currrentPage} fallback={<InvoicesTableSkeleton/>}>
                <Table query={query} currentPage={currrentPage}/>
            </Suspense>
            <div className="mt-5 w-full flex justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    )

}