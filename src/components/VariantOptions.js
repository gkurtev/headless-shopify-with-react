import { Button } from '@chakra-ui/button';
import { Text, Box, Flex } from '@chakra-ui/layout';
import React from 'react';

function VariantOptions(props) {
  const { options, activeVariant } = props;

  const renderValues = (opt) => {
    return opt.values.map((value, index) => {
      return (
        <Box padding='0.5rem' key={index}>
          <Button backgroundColor={value.value} color='#fff'>
            {value.value}
          </Button>
        </Box>
      );
    });
  };

  return (
    <Box mt='1rem'>
      {options.map((opt, index) => {
        return (
          <Box key={index}>
            <Box mb='1rem'>
              <Text>
                {opt.name}: {activeVariant.title}
              </Text>
            </Box>

            <Box>
              <Flex flexWrap='wrap' margin='-0.5rem'>
                {renderValues(opt)}
              </Flex>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default VariantOptions;
