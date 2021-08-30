/**
 * PayPal container.
 * @module components/PayPal/PayPal
 */
import React from 'react';
import { Container } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

/**
 * PayPal function.
 * @function PayPal
 * @returns {JSX.Element} Markup of the a PayPal option.
 */
function PayPal({ content }) {
  return (
    <Container text className="sponsorForm">
      <form
        className="ui form"
        target="paypal"
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="QKDMYV5T2LZLU" />
        <div className="field">
          <label htmlFor="os0">Sponsorship Options</label>
          <input type="hidden" name="on0" value="Sponsorship Options" />
          <select name="os0">
            <option value="Platinum">Platinum $4,000.00 USD</option>
            <option value="Gold">Gold $2,000.00 USD</option>
            <option value="Silver">Silver $1,000.00 USD</option>
            <option value="Bronze">Bronze $500.00 USD</option>
            <option value="Supporting">Supporting $100.00 USD</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="os1">Company name</label>
          <input type="hidden" name="on1" value="Company name" />
          <input type="text" name="os1" maxLength="200" />
        </div>
        <div className="field">
          <label htmlFor="os2">Company website</label>
          <input type="hidden" name="on1" value="Company name" />
          <input type="text" name="os2" maxLength="200" />
        </div>
        <div className="field">
          <input type="hidden" name="currency_code" value="USD" />

          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif"
            border="0"
            name="submit"
            alt="PayPal - The safer, easier way to pay online!"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </div>
      </form>
    </Container>
  );
}

export default injectIntl(PayPal);
