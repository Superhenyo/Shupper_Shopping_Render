import React from 'react';
import { Container, Row } from 'react-bootstrap';

export default function Footer() {
    const formatYearWithTrademark = (date) => {
        const year = new Date(date).getFullYear();
        return `© ${year} `;
    };

    return (
        <footer className="footer footerBackgroundColor">
            <Container>
                <Row className='text-center'>
                    <p className='p-0 m-0 footerHs'>{formatYearWithTrademark('2024')}ShupperShopping. All Rights Reserved</p>
                </Row>
            </Container>
        </footer>
    );
}
