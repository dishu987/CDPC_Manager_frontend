export const canAddUsers = (userRole: string): boolean => {
  const usersCanCreate = [
    "Chairperson",
    "Vice Chair",
    "Placement Manager",
    "HPC",
    "APC",
  ];
  return usersCanCreate.includes(userRole);
};
