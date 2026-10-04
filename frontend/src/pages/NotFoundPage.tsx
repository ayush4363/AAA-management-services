import React from 'react';
import { PageContainer } from '../components/common/PageContainer';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 flex-1 flex flex-col justify-center text-center">
      <PageContainer maxWidth="narrow">
        <span className="text-4xl font-bold text-[#D4A343] block mb-2">404</span>
        <h1 className="text-2xl font-bold text-[#F3F5F7] mb-3">Operational Route Not Found</h1>
        <p className="text-sm text-[#9BA3AF] mb-8">
          The requested coordinate does not exist or has been relocated within the AAA Management Services perimeter.
        </p>
        <Link to={ROUTES.PUBLIC.HOME}>
          <Button>Return to Security Perimeter</Button>
        </Link>
      </PageContainer>
    </div>
  );
};
