VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # ubuntu/trusty32 https://atlas.hashicorp.com/ubuntu/boxes/trusty32/versions/14.04/providers/virtualbox.box
  config.vm.box = "ubuntu/trusty32"

  config.vm.network :forwarded_port, host: 4567, guest: 9001
  config.vm.network :forwarded_port, host: 35729, guest: 35729

  config.vm.provision :shell, :path => "provisions/core.sh"
  config.vm.provision :shell, :path => "provisions/nvm.sh", :args => "stable grunt-cli bower", :privileged => false
  config.vm.provision :shell, :path => "provisions/rvm.sh", :args => "stable 2.2.1 sass", :privileged => false
end
