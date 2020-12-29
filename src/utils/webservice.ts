import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/*export enum HttpError {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 400
}*/

/**
 * Rest API Client based on Axios library
 *
 * @author K.ALIANNE
 * @since 18/11/2020
 */
export default class Webservice {
  private static readonly instance: Webservice = new Webservice();
  private static readonly endpoint: string = window.env.BACKEND_ENDPOINT;

  private constructor() {}

  public static getInstance(): Webservice {
    return Webservice.instance;
  }

  /**
   * Fetch resource from backend
   *
   * @param api endpoint path
   * @param config request config
   */
  public get<T = any, R = AxiosResponse<T>>(api: string, config?: AxiosRequestConfig): Promise<R> {
    try {
      return Axios.get(`${Webservice.endpoint}/${api}`, config);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Create new resource at the endpoint
   *
   * @param api
   * @param config
   */
  public post<T = any, R = AxiosResponse<T>>(api: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    try {
      return Axios.post(`${Webservice.endpoint}/${api}`, data, config);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Update existing resource at the endpoint
   *
   * @param api
   * @param config
   */
  public put<T = any, R = AxiosResponse<T>>(api: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    try {
      return Axios.put(`${Webservice.endpoint}/${api}`, data, config);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  
  /**
   * Delete existing resource at the endpoint
   *
   * @param api
   * @param config
   */
  public delete<T = any, R = AxiosResponse<T>>(api: string, config?: AxiosRequestConfig): Promise<R> {
    try {         
      return Axios.delete(`${Webservice.endpoint}/${api}`, config);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
