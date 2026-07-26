const adminOnly = (req, res, next) => {

  if (
    !req.user ||
    !req.user.roles.includes("admin")
  ) {

    return res.status(403).json({
      success: false,
      message: "Admin access only.",
    });

  }

  next();

};

export default adminOnly;