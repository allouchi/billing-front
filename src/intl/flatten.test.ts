import { flatten } from './flatten';

describe('flatten', () => {
  it('should flattent object', () => {
    const object = {
      key1: {
        key2: {
          key3: 'value3',
        },
      },
      key2: 'value2',
      key3: ['value3.0', 'value3.1', 'value3.2'],
    };

    expect(flatten(object)).toMatchInlineSnapshot(`
      Object {
        "key1.key2.key3": "value3",
        "key2": "value2",
        "key3.0": "value3.0",
        "key3.1": "value3.1",
        "key3.2": "value3.2",
      }
    `);
  });
});
