// scripts/deploy.js
async function main() {
  const LinkedIn = await ethers.getContractFactory("LinkedIn");
  const linkedin = await LinkedIn.deploy();

  console.log("LinkedIn deployed to:", linkedin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });