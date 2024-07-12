let itemCount=0;

function AddInvoiceItem(){
    itemcounter++;

    const newItemRow= `
    <tr  id='itemRow${itemCount}'>
        <td>input type="text" class="form-control" placeholder="Enter a Description"
        required></td>
        
        <td>input type="number" class="form-control" placeholder="Enter Quantity
        required></td>
            
        <td>input type="number" class="form-control" placeholder="Enter Unit price"
        required></td>
            
        <td>input type="text" class="form-control" placeholder="Enter a Total Item"
        required></td>
            
        

        <td><button type="button" class="btn btn-primary"></td>
        `;

        $("#invoiceItem tbody").append(newItemRow);
}