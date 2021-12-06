import { Element } from '../src/types/types';
import {removeItem} from '../src/redux/actions';
import Helpers from '../src/helpers/dataHelpers';
import dataHelpers from '../src/helpers/dataHelpers';
const input: Element[] = require('./elementsArray.json');

/**
 * The Test suite for testing the removeData function for removing certain elements
 */
describe('removing an element', ():void => {
  const elementWithoutParent: Element = {
    id: 'ec6ee5ee-57f2-4846-baed-3216c801d06e',
    title: 'King Charles Spaniel',
    description: 'A King Charles Spaniel likes Latin',
    displayName: 'King Charles Spaniel',
  };

  const childElement: Element = {
    id: '1d59c8b4-2353-4142-892c-38358fd85730',
    title: 'Pug',
    description: 'A Pug likes Hip Hop',
    displayName: 'Pug',
  };

  test('it should remove the element without a parent from the array of elements', ():void => {
    const elementExistsBeforeRemoval:Element = input.find(
      element => element.id === elementWithoutParent.id,
    )!;
    expect(elementExistsBeforeRemoval).toEqual(elementWithoutParent);

    const elementExistsInArrayAfterRemoval:Element = Helpers.removeData(
      input,
      elementWithoutParent.id!,
      '',
    ).find(element => element.id === elementWithoutParent.id)!;
    expect(elementExistsInArrayAfterRemoval).toEqual(undefined);
  });

  test('it should remove the child element from the array of elements', ():void => {
    const childExistsInArrayBeforeRemoval:boolean = JSON.stringify(input).includes(
      childElement.id!,
    );
    expect(childExistsInArrayBeforeRemoval).toEqual(true);

    const arrayWithoutChildElement:Element[] = [
      ...Helpers.removeData(input, childElement.id!, 'Grand Bleu de Gascogne'),
    ];
    const childExistsInArrayAfterRemoval:boolean = JSON.stringify(
      arrayWithoutChildElement,
    ).includes(childElement.id!);
    expect(childExistsInArrayAfterRemoval).toEqual(false);
  });
});

describe('updating an element', ():void => {
  const newUpdatedElement: Element = {
    id: 'ec6ee5ee-57f2-4846-baed-3216c801d06e',
    title: 'New Title For Element',
    description: 'New Description For Element',
    displayName: 'King Charles Spaniel',
  };

  test('it should update the element in the array of elements', ():void => {
    const findElementBeforeUpdate:Element = input.find(
      element => element.id === newUpdatedElement.id,
    )!;
    expect(findElementBeforeUpdate).not.toEqual(newUpdatedElement);
    const newUpdatedArray:Element[] = [
      ...dataHelpers.updateData(
        input,
        'ec6ee5ee-57f2-4846-baed-3216c801d06e',
        newUpdatedElement,
      ),
    ];
    const findElementAfterUpdate:Element = newUpdatedArray.find(
      element => element.id === newUpdatedElement.id,
    )!;
    expect(findElementAfterUpdate).toEqual(newUpdatedElement);
  });
});

describe('shuffling the list of elements', ():void => {
  test('it should change the order of the elements in the array', ():void => {
    const shuffledArray:Element[] = [...dataHelpers.shuffleArray(input)];
    expect(shuffledArray).toHaveLength(input.length);
    expect(shuffledArray !== input).toEqual(true);
  });
});
