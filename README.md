# CoinDesk API Integration

This project utilizes the CoinDesk API to provide real-time cryptocurrency conversion rates. By implementing a React application with Vite as the starter and customizable styling, users can conveniently access and manipulate cryptocurrency data.

## Features

### Navbar Sections

#### Current Conversion Rates

- Display conversion rates in both directions: USD to BTC and BTC to USD, EUR to BTC and BTC to EUR, GBP to BTC and BTC to GBP.

#### Conversions

- Allow users to sort exchange rates by clicking a button, prioritizing the highest number of fiat to BTC and the lowest number of fiat to BTC.

- Provide a single SELECT dropdown for currency selection (Euro, GBP, USD).

- Enable users to input an amount for conversion, instantly displaying its equivalent value in BTC.

### Persistent Data

- Always display the data date from the API, converting the UTC time to the user's current browser time zone.

- Implement a user-friendly mechanism that prevents rate refetching within 5 minutes of the previous request, even after browser refreshes.

## Technology Stack

- **Starter:** Developed using Vite for rapid development and optimized performance.

- **Styling:** Styling options include Bootstrap, Tailwind, or custom styles based on your comfort level.

- **API Integration:** Integrates the CoinDesk API for up-to-date cryptocurrency conversion rates.

## How to Run

1. Clone this repository.
2. Install the necessary dependencies using your preferred package manager (e.g., npm or yarn).
3. Run the development server using `npm run dev` or `yarn dev`.

## Contribution

Feel free to contribute to enhance the project's features, design, or functionality. Your contributions will help improve the user experience and expand the capabilities of cryptocurrency conversion tracking.

## Note

This project demonstrates practical integration with real-time API data while prioritizing user experience and data accuracy. Enjoy exploring cryptocurrency conversion rates seamlessly and stay updated with the latest trends in the crypto world.
