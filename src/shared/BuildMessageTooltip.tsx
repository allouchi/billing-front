import { useIntl } from "react-intl";

const BuildMessageTooltip = (item: string, action: string): string => {
    const intl = useIntl();    
    const itemId = intl.formatMessage(
        { id:  `tooltip.${item}`},      
      );  
    const actionId = intl.formatMessage(
        { id:  `tooltip.${action}`}, {cle:itemId},      
      );  
    
    return actionId;
}
export default BuildMessageTooltip;