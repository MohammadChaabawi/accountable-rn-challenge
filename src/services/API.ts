import {Element} from '../types/types';
/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */

function fetchData(): Promise<any> {
  // Simulate an error 50% of the time just for testing purposes
  let randomNumber = Math.random();
  if (randomNumber > 0.85) {
    return new Promise((resolve, reject) => {
      reject(Error('failure'));
    });
  } else if (randomNumber > 0.7) {
    return new Promise((resolve, reject) => {
      reject(Error('retry'));
    });
  } else {
    const jsonData = require('./db.json');
    let withoutQuestionsForFirstLayer = jsonData.map(
      (element: {question: any}) => {
        if (element.question) {
          delete element.question;
        }
        return element;
      },
    );
    return new Promise<Element>((resolve, reject) => {
      resolve(withoutQuestionsForFirstLayer);
    });
  }
}

export default {
  fetchData,
};
