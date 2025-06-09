// This is a mock component to demonstrate email templates
// In a real application, these would be server-side templates

export interface EmailTemplateProps {
  recipientName: string
  orderId: string
  orderStatus: string
  orderItems: Array<{ name: string; quantity: number }>
  trackingNumber?: string
  estimatedDelivery?: string
  actionUrl: string
}

export function OrderStatusEmailTemplate({
  recipientName,
  orderId,
  orderStatus,
  orderItems,
  trackingNumber,
  estimatedDelivery,
  actionUrl,
}: EmailTemplateProps) {
  // This is a mock template - in a real app this would be HTML for an email
  const getStatusMessage = () => {
    switch (orderStatus) {
      case "processing":
        return "Your order is now being processed. We'll let you know once it ships!"
      case "shipped":
        return `Your order has been shipped! ${
          trackingNumber ? `You can track your package with tracking number: ${trackingNumber}` : ""
        }`
      case "out_for_delivery":
        return "Your order is out for delivery and will arrive soon!"
      case "delivered":
        return "Your order has been delivered. We hope you enjoy your eco-friendly products!"
      default:
        return "There's an update to your order."
    }
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Status Update</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4ade80; padding: 20px; text-align: center; color: white; }
        .content { padding: 20px; background-color: #f9fafb; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
        .button { display: inline-block; background-color: #16a34a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
        .items { margin: 20px 0; }
        .item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Order Status Update</h1>
      </div>
      <div class="content">
        <p>Hello ${recipientName},</p>
        <p>${getStatusMessage()}</p>
        
        <h2>Order Details</h2>
        <p><strong>Order Number:</strong> ${orderId}</p>
        ${estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>` : ""}
        
        <div class="items">
          <h3>Items in your order:</h3>
          ${orderItems
            .map(
              (item) => `
            <div class="item">
              <p><strong>${item.name}</strong> x ${item.quantity}</p>
            </div>
          `,
            )
            .join("")}
        
        
        <p>
          <a href="${actionUrl}" class="button">View Order Details</a>
        </p>
        
        <p>Thank you for choosing Grooveo for your eco-friendly packaging needs!</p>
      </div>
      <div class="footer">
        <p>© 2025 Grooveo. All rights reserved.</p>
        <p>If you have any questions, please contact our customer support at support@grooveo.com</p>
      </div>
    </body>
    </html>
  `
}
