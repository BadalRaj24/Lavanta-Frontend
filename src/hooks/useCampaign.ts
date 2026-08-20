import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CAMPAIGN_CONFIG,
  isCampaignActive,
  getCampaignTimeRemaining,
  getEffectivePrice,
  getUrlTestingParams
} from '../config/campaignConfig';

export function useCampaign() {
  let location: any = null;
  try {
    location = useLocation();
  } catch {
    // In case hook is called outside BrowserRouter
    location = null;
  }

  const [isActive, setIsActive] = useState<boolean>(() => isCampaignActive());
  const [timeRemaining, setTimeRemaining] = useState(() => getCampaignTimeRemaining());
  const [testingParams, setTestingParams] = useState(() => getUrlTestingParams());

  const syncCampaignState = () => {
    setIsActive(isCampaignActive());
    setTimeRemaining(getCampaignTimeRemaining());
    setTestingParams(getUrlTestingParams());
  };

  // Sync whenever route or search parameters change
  useEffect(() => {
    syncCampaignState();
  }, [location?.pathname, location?.search]);

  // 1-second timer to update countdown and re-evaluate active boundaries
  useEffect(() => {
    syncCampaignState();
    const interval = setInterval(() => {
      syncCampaignState();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    isActive,
    timeRemaining,
    config: CAMPAIGN_CONFIG,
    testingParams,
    getEffectivePrice: (basePrice?: number) => getEffectivePrice(basePrice)
  };
}
