let itemCount = 0;

        function addInvoiceItem() {
            itemCount++;

            const newItemRow = `
            <tr id='itemRow${itemCount}'>
                <td><input type="text" class="form-control" placeholder="Enter a Description" required></td>
                <td><input type="number" class="form-control quantity" placeholder="Enter Quantity" required></td>
                <td><input type="number" class="form-control price" placeholder="Enter Unit price" required></td>
                <td><input type="text" class="form-control totalItemPrice" placeholder="Enter a Total Item" readonly></td>
                <td><button type="button" class="btn btn-primary" onclick="removeInvoiceItem(${itemCount})">remove</button></td>
            </tr>
            `;
            // appending to table body
            $("#invoiceItem").append(newItemRow);

            // Attach event listeners to the new input fields
            $(`#itemRow${itemCount} .quantity, #itemRow${itemCount} .price`).on('input', function() {
                updateTotalAmount();
            });

            // update total amount on every item added
            updateTotalAmount();
        }

        // parseFloat ~ converts value to a floating point number
        function updateTotalAmount() {
            let totalAmount = 0;
            $("tr[id^='itemRow']").each(function() {
                const quantity = parseFloat($(this).find(".quantity").val()) || 0;
                const unitPrice = parseFloat($(this).find(".price").val()) || 0;
                const totalItemPrice = quantity * unitPrice;

                $(this).find(".totalItemPrice").val(totalItemPrice.toFixed(2));
                totalAmount += totalItemPrice;
            });
            $("#TotalAmount").val(totalAmount.toFixed(2));
        }

        function removeInvoiceItem(itemId) {
            $(`#itemRow${itemId}`).remove();
            updateTotalAmount();
        }
        $("document").ready(function(){
            //automatic invoice date generator
            const currentDate= new Date();
            const formattedDate= currentDate.toISOString().slice(0,10);// gives the date in (yyyy-mm-dd) and slice can we the count from 0 to 10 
            $("#InvoiceDate").val(formattedDate);

            $("#InvoiceDate").submit(function(event){
                event.preventDefault();
                updateTotalAmount();
            });
       });

       
        