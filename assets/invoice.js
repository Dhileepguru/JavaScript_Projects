let itemCount = 0;

function addInvoiceItem() {
    itemCount++;

    const newItemRow = `
    <tr id='itemRow${itemCount}'>
        <td><input type="text" class="form-control" placeholder="Enter a Description" required></td>
        <td><input type="number" class="form-control quantity" placeholder="Enter Quantity" required></td>
        <td><input type="number" class="form-control price" placeholder="Enter Unit price" required></td>
        <td><input type="number" class="form-control SGST" placeholder="Enter SGST (%)" required></td>
        <td><input type="number" class="form-control CGST" placeholder="Enter CGST (%)" required></td>
        <td><input type="text" class="form-control totalItemPrice" placeholder="Total Item Price" readonly></td>
        <td><button type="button" class="btn btn-primary" onclick="removeInvoiceItem(${itemCount})">Remove</button></td>
    </tr>
    `;
    // Append to table body
    $("#invoiceItem").append(newItemRow);

    // Attach event listeners to the new input fields
    $(`#itemRow${itemCount} .quantity, #itemRow${itemCount} .price, #itemRow${itemCount} .SGST, #itemRow${itemCount} .CGST`).on('input', function() {
        updateTotalAmount();
    });

    // Update total amount on every item added
    updateTotalAmount();
}

// ParseFloat ~ converts value to a floating point number
function updateTotalAmount() {
    let totalAmount = 0;
    $("tr[id^='itemRow']").each(function() {
        const quantity = parseFloat($(this).find(".quantity").val()) || 0;
        const unitPrice = parseFloat($(this).find(".price").val()) || 0;
        const SGST = parseFloat($(this).find(".SGST").val()) || 0;
        const CGST = parseFloat($(this).find(".CGST").val()) || 0;

        const basePrice = quantity * unitPrice;
        const SGSTAmount = (basePrice * SGST) / 100;
        const CGSTAmount = (basePrice * CGST) / 100;
        const totalItemPrice = basePrice + SGSTAmount + CGSTAmount;

        $(this).find(".totalItemPrice").val(totalItemPrice.toFixed(2));
        totalAmount += totalItemPrice;
    });
    $("#TotalAmount").val(totalAmount.toFixed(2));
}

function removeInvoiceItem(itemId) {
    $(`#itemRow${itemId}`).remove();
    updateTotalAmount();
}

function printInvoice() {
    const CustomerName = $("#customerName").val();
    const invoiceData = $("#InvoiceData").val();
    const items = [];

    $("tr[id^='itemRow']").each(function() {
        const description = $(this).find("td:eq(0) input").val();
        const Quantity = $(this).find("td:eq(1) input").val();
        const unitPrice = $(this).find("td:eq(2) input").val();
        const SGST = $(this).find("td:eq(3) input").val();
        const CGST = $(this).find("td:eq(4) input").val();
        const totalItemPrice = $(this).find("td:eq(5) input").val();

        items.push({
            description: description,
            Quantity: Quantity,
            unitPrice: unitPrice,
            SGST: SGST,
            CGST: CGST,
            totalItemPrice: totalItemPrice
        });
    });

    const totalAmount = $("#TotalAmount").val();

    const invoiceContent = `
    <html>
        <head>
            <title>Invoice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table, th, td {
                    border: 1px solid black;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                }
                .total {
                    font-weight: bold;
                    margin-top: 20px;
                }
                body {
                    background: url('/JavaScript_Projects/assets/images/Desktop - 1 (4).png') no-repeat center center fixed;
                    background-size: cover;
                }
                .container {
                    background: rgba(255, 255, 255, 0.9);
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                h2 {
                    color: #333;
                }
                .form-group label {
                    font-weight: bold;
                }
                .form-control {
                    border-radius: 5px;
                }
                .btn {
                    border-radius: 5px;
                }
                .table th, .table td {
                    vertical-align: middle;
                }

            </style>
        </head>
        <body>
            <h2>TAX INVOICE</h2>
            <h3>Bill To: INDIA</h3>
            <p><strong>Customer Name:</strong> ${CustomerName}</p>
            <p><strong>Date and Time:</strong> ${$("#InvoiceDate").val()}</p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Item Description</th>
                        <th>Quantity</th>
                        <th>Unit price</th>
                        <th>SGST</th>
                        <th>CGST</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map((item) => `
                    <tr>
                        <td>${item.description}</td>
                        <td>${item.Quantity}</td>
                        <td>${item.unitPrice}</td>
                        <td>${item.SGST}</td>
                        <td>${item.CGST}</td>
                        <td>${item.totalItemPrice}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
            <p class="total">Total amount: ${totalAmount}</p>
        </body>
    </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
}
function downloadInvoice()
{
    const CustomerName = $("#customerName").val();
    const invoiceDate = $("#InvoiceDate").val();
    const items = [];

    $("tr[id^='itemRow']").each(function() {
        const description = $(this).find("td:eq(0) input").val();
        const Quantity = $(this).find("td:eq(1) input").val();
        const unitPrice = $(this).find("td:eq(2) input").val();
        const SGST = $(this).find("td:eq(3) input").val();
        const CGST = $(this).find("td:eq(4) input").val();
        const totalItemPrice = $(this).find("td:eq(5) input").val();

        items.push({
            description: description,
            Quantity: Quantity,
            unitPrice: unitPrice,
            SGST: SGST,
            CGST: CGST,
            totalItemPrice: totalItemPrice
        });
    });
    const totalAmount = $("#TotalAmount").val();
    //download using jsquery
    const { jsPDF } =window.jspdf;
    const doc=new jsPDF();
    
    doc.setFontSize(18);
    doc.text("TAX INVOICE",14,22);
    doc.setFontSize(12);
    doc.text(`Bill To: INDIA`, 14, 32);
    doc.text(`Customer Name: ${CustomerName}`, 14, 42);
    doc.text(`Date and Time: ${invoiceDate}`, 14, 52);

    const tableColumn = ["Item Description", "Quantity", "Unit price", "SGST", "CGST", "Total"];
    const tableRows = [];

    items.forEach(item => {
        const itemData = [
            item.description,
            item.Quantity,
            item.unitPrice,
            item.SGST,
            item.CGST,
            item.totalItemPrice
        ];
        tableRows.push(itemData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 62 });
    doc.text(`Total amount: ${totalAmount}`, 14, doc.previousAutoTable.finalY + 10);

    doc.save(` invoice.pdf`);


}







$(document).ready(function() {
    // Automatic invoice date generator
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // gives the date in (yyyy-mm-dd) slice is to take only 10 chars
    $("#InvoiceDate").val(formattedDate);

    $("#invoiceform").submit(function(event) {
        event.preventDefault();
        updateTotalAmount();
    });

    $("#printInvoice").click(function() {
        printInvoice();
    });
    $("#downloadInvoice").click(function(){
        downloadInvoice();
    })
});
