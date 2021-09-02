const filter = async (i) => {
  await i.deferUpdate().catch(console.error);
  return i.user.id === interaction.user.id;
};

const result = await message.awaitMessageComponent({ filter, time: 60000 })
  .then(callback).catch((err) => {
    if (!err.toString().includes('reason: time')) console.log(err);
    message.edit({ components: [] });
  });

function callback(i) {
  console.log('Custom Id assigned to the component', i.customId);
  console.log('Values selected for select menus', i.values);
}