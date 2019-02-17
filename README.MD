## Uploading to ELB

1. Download and install `awsebcli` via python's `pip` command tool or `brew` on MacOS.
2. You'll need your AWS Access ID and AWS Secret Key, both of which are generated and not stored by AWS. (If you have an existing EC2 instance)
3. The `eb deploy` command (once configured) will run `git archive` to create a .zip file from the most recent `git commit` command.
