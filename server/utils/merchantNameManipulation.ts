// STEP 2: Identify categoires of merchant
//

// STEP 1: Cleanse the merchant names to a standard format
// take unknown string and format it if it matches another
// could just include all differnet types in category search but with our data structure,
// don't want different merchant entries if they are the same

export const standardizeName = (merchant: string) => {
  const merchantLower = merchant.toLowerCase();
  const rules = {
    TFL: 'tfl tfl rail tfl london', // could also array.join
    Tesco: 'tesco store tesco',
    BT: 'bt bt broadband',
  };

  for (const [key, value] of Object.entries(rules)) {
    if (value.includes(merchantLower)) return key;
  }
  return merchant;
};

export const assignSubscriptions = (merchant: string) => {
  return true;
};
