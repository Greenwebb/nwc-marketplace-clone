# eBay Seller Onboarding for Zambian Vendors: Workflow and Parameters

This document provides a customized overview of the eBay seller onboarding process for **Zambian vendors**. It outlines the specific workflow, key steps, and associated parameters required for Zambian sellers to get started on the eBay platform.

## Onboarding Workflow Overview

The eBay seller onboarding process can be broken down into four main stages: Account Creation, Verification, Listing Creation, and Seller Hub access. The following diagram illustrates the high-level workflow:



Detailed Parameters and Specifications

This section outlines the specific parameters and data requirements for each step of the onboarding process.

### 1. Account Creation & Registration

The first step is to create an eBay account or log in to an existing account. New sellers will need to provide the following information:

| Parameter | Data Type | Description | Required | Notes |
| --- | --- | --- | --- | --- |
| **Account Type** | String | The type of seller account to be created. | Yes | Options: "Personal" or "Business". |
| **Full Name** | String | The seller's full legal name. | Yes | For Personal accounts. |
| **Address** | String | The seller's physical address. | Yes | For both Personal and Business accounts. |
| **Date of Birth** | Date | The seller's date of birth. | Yes | For Personal accounts. |
| **National Registration Card (NRC) Number** | String | The seller's National Registration Card number. | Yes | For Personal accounts. |
| **Legal Business Name** | String | The legal name of the business. | Yes | For Business accounts. |
| **DBA (Doing Business As)** | String | The operating name of the business, if different from the legal name. | No | For Business accounts. |

| **Business Address** | String | The physical address of the business. | Yes | For Business accounts. |
| **Phone Number** | String | The seller's or business's phone number. | Yes | Used for verification. |
| **Email Address** | String | The primary email address for the account. | Yes | Used for login and communication. |
| **Password** | String | The password for the eBay account. | Yes | Required if not using social login. |

### 2. Verification and Payment Method

After creating an account, eBay requires sellers to verify their identity and financial information.

| Parameter | Data Type | Description | Required | Notes |
| --- | --- | --- | --- | --- |
| **Phone Verification Code** | String | A one-time security code sent to the seller's phone number. | Yes | - |
| **National Registration Card (NRC)** | File | A scanned copy or photo of the seller's National Registration Card. | Yes | Accepted formats: JPEG, JPG, PDF, PNG. Max file size: 10 MB. |
#### Payment Method

Sellers can choose to receive payouts via bank account or mobile money.

**Bank Account Details**

| Parameter | Data Type | Description | Required | Notes |
|---|---|---|---|---|
| **Bank Account Holder Name** | String | The name on the bank account. | Yes | Must match the name on the eBay account. |
| **Bank Name** | String | The name of the seller's bank in Zambia. | Yes | - |
| **Branch Code** | String | The bank's branch code. | Yes | - |
| **Account Number** | String | The seller's bank account number. | Yes | - |
| **Bank Statement** | File | A recent bank statement for the provided account. | Yes | Must be less than 3 months old and show the account holder's name, address, and account number. Accepted formats: JPEG, JPG, PDF, PNG. Max file size: 10 MB. |

**Mobile Money Details**

| Parameter | Data Type | Description | Required | Notes |
|---|---|---|---|---|
| **Mobile Money Provider** | String | The mobile money provider. | Yes | Options: "Airtel Money", "MTN Mobile Money", "Zamtel Money". |
| **Mobile Money Number** | String | The seller's mobile money number. | Yes | - |

### 3. Listing Creation

Once verified, sellers can create their first listing.

| Parameter | Data Type | Description | Required | Notes |
| --- | --- | --- | --- | --- |
| **Item Title** | String | A descriptive title for the item being sold. | Yes | - |
| **Item Category** | String | The category that best fits the item. | Yes | eBay provides suggestions based on the title. |
| **Item Condition** | String | The condition of the item. | Yes | Options vary by category (e.g., "New", "Used", "For parts or not working"). |
| **Item Description** | String | A detailed description of the item. | Yes | Can include text, images, and formatting. |
| **Photos** | File | High-quality photos of the item. | Yes | Multiple angles are recommended. |
| **Price (ZMW)** | Number | The price of the item in Zambian Kwacha. | Yes | Can be a fixed price (Buy It Now) or a starting price for an auction. |
| **Shipping Carrier** | String | The shipping carrier to be used. | Yes | - |
| **Shipping Cost** | Number | The cost of shipping. | Yes | Can be a flat rate or calculated based on the buyer's location. |
| **Local Pickup** | Boolean | Whether local pickup is offered. | No | - |

### 4. Seller Hub Dashboard

After the first listing is created, sellers gain access to the Seller Hub, which is the central dashboard for managing their eBay business. The Seller Hub provides access to the following key features and data:

- **Listings**: Manage active, unsold, and draft listings.

- **Orders**: View and manage all incoming orders.

- **Sales**: Track sales performance and trends.

- **Payouts**: Monitor payouts and view transaction history.

- **Performance**: See detailed metrics on seller performance.

- **Marketing**: Access tools for promoting listings.

## References

[1]: https://export.ebay.com/en/first-steps/how-to-create-seller-account/ "eBay. (n.d. ). How to register as a seller on eBay: Step-by-step guide. Retrieved from"

[2]: https://www.ebay.com/help/selling/getting-paid/registering-seller?id=4792 "eBay. (n.d. ). Registering as a seller. Retrieved from"

[3]: https://export.ebay.com/en/first-steps/how-to-create-seller-account/bank-account/ "eBay. (n.d. ). If your payouts will go to a bank account. Retrieved from"

[4]: https://www.ebay.com/sellerhub "eBay. (n.d. ). Seller Hub. Retrieved from"

