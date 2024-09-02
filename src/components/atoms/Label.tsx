import React from 'react';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="mb-2 text-[#475467] font-[400] text-[14px]">{children}</label>
);

export default Label;
