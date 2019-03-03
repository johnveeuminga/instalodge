import axios from 'axios';
import qs from 'qs';

const REQM = ' is required';
const STRIPE_URL = 'https://api.stripe.com/v1/';

class Stripe {

  stripePublicKey;
  planId;

  constructor() {
    this.stripePublicKey = 'sk_test_dIuSLqHQiROA2bdnGfVuY84L';
    this.planId = 'plan_Ed6jbdioeo7UHL';
  }
  /**
   * Return the default header entries : Accept and Authorization
   * @returns {Object} Default header Accept and Authorization
   */
  defaultHeader() {
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${this.stripePublicKey}`,
    };
  }

  /**
   * Generic method post to Stripe Rest API
   * @param resource : Rest API ressource ie. tokens, charges, etc.
   * @param properties : object, key by form parm
   */
  async stripePostRequest(resource, properties) {
    try {
      const result = await axios.post(`${STRIPE_URL}${resource}`, properties, {
        headers: {
          ...this.defaultHeader(),
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })

      console.log(result.data);
      return result.data;
    } catch(err) {
      console.log(err)
    }
  }

  /**
   * Only operation allowed from client/Using only public token
   * @param info : { number, exp_month, exp_year, address_city, address_country, address_line1,
   * ... address_line2, address_state, address_zip, currency, cvc }
   */
  async createToken(info) {
    if (!info) throw new Error(`info${REQM}`);
    if (!info.number) throw new Error(`cardNumber${REQM}`);
    if (!info.exp_month) throw new Error(`expMonth${REQM}`);
    if (!info.exp_year) throw new Error(`expYear${REQM}`);
    if (!info.cvc) throw new Error(`cvc${REQM}`);

    const card = Object.assign({}, info);
    const body = Object.entries(card)
     .map(([key, value]) => `card[${key}]=${value}`)
     .reduce((previous, current) => `${previous}&${current}`, '');

    return await this.stripePostRequest('tokens', body);
  }

  /**
   * Creates a new Stripe customer.
   * 
   * @param {Object} info The customer info
   */
  async createCustomer (info) {
    const body = qs.stringify(info);

    return await this.stripePostRequest('customers', body)
  }

  /**
   * Adds the homeowner subscription to the customer.
   * 
   * @param {String} customer The customer id.
   */
  async createSubscription (customer) {
    const body = {
      customer,
      items: [
        {
          plan: this.planId,
        }
      ]
    }

    return await this.stripePostRequest('subscriptions', qs.stringify(body));
  }
}


export default Stripe;
