exports.structuredPermissions = (flatPermissions) => {
  const nestedPermissions = {
    sitePermissions: {},
    usersPermissions: {},
    communitiesPermissions: {},
    adminPermissions: {}
  };

  for (let key in flatPermissions) {
    if (key.startsWith("site_")) {
        nestedPermissions.sitePermissions[key] = flatPermissions[key];
    } else if (key.startsWith("users_")) {
        nestedPermissions.usersPermissions[key] = flatPermissions[key];
    } else if (key.startsWith("communities_")) {
        nestedPermissions.communitiesPermissions[key] = flatPermissions[key];
    } else if (key.startsWith("admin_")) {
        nestedPermissions.adminPermissions[key] = flatPermissions[key];
    }
  }
console.log(nestedPermissions);
return nestedPermissions;
}